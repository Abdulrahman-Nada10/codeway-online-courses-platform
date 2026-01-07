namespace CourseOnline.Auth.Helpers
{
    public class FileHelper
    {
        private readonly string _uploadFolder;

        public FileHelper(IWebHostEnvironment env)
        {
            _uploadFolder = Path.Combine(env.WebRootPath, "files");
            if (!Directory.Exists(_uploadFolder))
            {
                Directory.CreateDirectory(_uploadFolder);
            }   
           

        }
        public string UploadFile(IFormFile file, string newFileName = null)
        {
            if (file == null || file.Length == 0) return null;

            string fileName = newFileName ?? $"{Guid.NewGuid()}_{file.FileName}";
            string filePath = Path.Combine(_uploadFolder, fileName);

            // رفع الملف
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            // نرجع الـ URL النسبي عشان الفرونت يستخدمه
            return $"/files/{fileName}";
        }

        public void DeleteFile(string fileUrl)
        {
            if (string.IsNullOrEmpty(fileUrl)) return;

            string fileName = Path.GetFileName(fileUrl);
            string filePath = Path.Combine(_uploadFolder, fileName);

            if (File.Exists(filePath))
                File.Delete(filePath);
        }



        public string SaveFile(IFormFile file)
        {
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(_uploadFolder, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }
            return fileName;
        }
    }
}
