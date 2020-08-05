module.exports = {
  port: 8085,
  secret: process.env.AWS_SECRET,
  awsConfig: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: "us-east-1"
  },
}