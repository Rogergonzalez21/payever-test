const fs = require('fs');
const path = require('path');
const axios = require('axios');

exports.getUser = async (req, res, next) => {
  const { userId } = req.params;
  const response = await axios.get(`https://reqres.in/api/users/${userId}`);
  req.user = response.data.data;
  next();
};

exports.returnUser = (req, res) => {
  return res.json(req.user);
};

exports.getAvatarInfo = (req, res, next) => {
  res.url = req.user.avatar;
  const splittedURL = res.url.split('/');
  const filename = splittedURL
    .pop()
    .split('.')
    .pop();
  const username = splittedURL[splittedURL.length - 1];
  const fullFileName = `${username}.${filename}`;
  res.downloadPath = path.resolve(__dirname, '../', 'images', fullFileName);

  next();
};

exports.getAvatar = async (req, res) => {
  const { downloadPath, url } = res;
  if (fs.existsSync(downloadPath)) {
    return res.sendFile(downloadPath);
  }
  const writer = fs.createWriteStream(downloadPath);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);
  await new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });

  return res.sendFile(downloadPath);
};

exports.deleteAvatar = async (req, res) => {
  const { downloadPath } = res;

  await fs.unlink(downloadPath, err => {
    if (err)
      return res.status(400).json({ error: 'The image does not exists' });
    return res.status(204).json({ deleted: true });
  });
};
