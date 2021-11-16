import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		// console.log('hello');
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		// console.log(path.extname(file.originalname));
		const uniqueName = `${Date.now()}-${Math.round(
			Math.random() * 1e9
		)}${path.extname(file.originalname)}`;
		cb(null, uniqueName);
	},
});

const uploads = multer({
	storage,
});

export default uploads;
