using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Resources
{
    public static class FileResources
    {
        public static void SaveFormFile(string path, IFormFile file)
        {
            using (var stream = new FileStream(path, FileMode.Create))
            {
                file.CopyTo(stream);
            }
        }

        public static void DeleteFilesByPattern(string path, string containingString)
        {
            string[] oldImages = Directory.GetFiles(path, $@"*{containingString}*");

            foreach (var img in oldImages)
            {
                File.Delete(img);
            }
        }

        public static string ToBase64(string imagePath)
        {
            string fullPath = Path.Combine(Directory.GetCurrentDirectory(), imagePath);
            try
            {
                byte[] imageArray = File.ReadAllBytes(fullPath);
                return Convert.ToBase64String(imageArray);
            }catch (Exception ex)
            {
                return null;
            }
           
        }
    }
}
