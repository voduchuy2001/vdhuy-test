const fs = require("fs");
const path = require("path");
const cron = require("node-cron");

const cleanupFiles = () => {
  const uploadDir = path.join(__dirname, "../storage/images");
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error("Error reading upload directory:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(uploadDir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error("Error getting file stats:", err);
          return;
        }

        const currentTime = new Date();
        const fileModifiedTime = stats.mtime;
        const timeDifference = currentTime - fileModifiedTime;
        const oneHourInMilliseconds = 3600000;

        if (timeDifference > oneHourInMilliseconds) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
              return;
            }
            console.log(`Deleted file: ${filePath}`);
          });
        }
      });
    });
  });
};

cron.schedule("0 * * * *", () => {
  console.log("Running file cleanup cron job...");
  cleanupFiles();
});

module.exports = {
  cleanupFiles: cleanupFiles,
};
