namespace CourseOnline.Auth.Helpers
{
    public static class PasswordHasher
    {
        public static void CreatePasswordHash(
            string password,
            out string passwordHash,
            out string passwordSalt)
        {
            using var hmac = new System.Security.Cryptography.HMACSHA512();

            // Salt مختلف لكل مستخدم
            passwordSalt = Convert.ToBase64String(hmac.Key);

            passwordHash = Convert.ToBase64String(
                hmac.ComputeHash(
                    System.Text.Encoding.UTF8.GetBytes(password)
                )
            );
        }

        public static bool VerifyPassword(
            string password,
            string storedHash,
            string storedSalt)
        {
            var saltBytes = Convert.FromBase64String(storedSalt);

            using var hmac = new System.Security.Cryptography.HMACSHA512(saltBytes);

            var computedHash = Convert.ToBase64String(
                hmac.ComputeHash(
                    System.Text.Encoding.UTF8.GetBytes(password)
                )
            );

            return computedHash == storedHash;
        }
    }
}
