const multer = require("multer");
const fs = require("fs");
const path = require("path");

exports.userFile = ((req, res, next) => {
  const getFilType = (file) => {
    const mimeType = file.mimetype.split("/");
    return mimeType[mimeType.length - 1];
  };

  const generateFileName = (req, file, cb) => {
    const extension = getFilType(file);
    const filename =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + "." + extension;

    cb(null, file.fieldname + "-" + filename);
  };

  const fileFilter = (req, file, cb) => {
    const extension = getFilType(file);
    const allowedType = /jpeg|jpg|png/;
    const isAllowed = allowedType.test(extension);

    if (isAllowed) {
      return cb(null, true);
    }

    return cb(null, false);
  };

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const { id } = req.user;
      const dest = `uploads/user/${id}`;

      fs.access(dest, (error) => {
        //folder doesn't exist
        if (error) {
          return fs.mkdir(dest, (error) => {
            cb(error, dest);
          });
        } else {
          //folder exists
          fs.readdir(dest, (error, files) => {
            if (error) {
              throw error;
            } else {
              for (const file of files) {
                console.log(file, dest);
                fs.unlink(path.join(dest, file), (error) => {
                  if (error) {
                    throw error;
                  }
                });
              }

              return cb(null, dest);
            }
          });
        }
      });
    },
    filename: generateFileName,
  });

  return multer({ storage, fileFilter }).single("avatar");
})();
