// Controllers/FileUploadController.cs
using CourseContentMicroService.Application.DTO_s.FileUploadDto;
using CourseContentMicroService.Application.Interfaces;
using CourseContentMicroService.Domain.Entities.Enums;
using GlobalResponse.Shared.Models;
using Microsoft.AspNetCore.Mvc;

namespace CourseContentMicroService.Controllers
{
    [ApiController]
    [Route("api/file-upload")]
    public class FileUploadController : ControllerBase
    {
        private readonly IFileUploadService _fileUploadService;

        public FileUploadController(IFileUploadService fileUploadService)
        {
            _fileUploadService = fileUploadService;
        }

        /// <summary>
        /// Upload video content for a lesson (MP4, AVI, MOV) - Max 2GB
        /// </summary>
        [HttpPost("video/{lessonId}")]
        [ProducesResponseType(typeof(ApiResponse<FileUploadResponseDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<FileUploadResponseDto>), StatusCodes.Status400BadRequest)]
        [RequestSizeLimit(2147483648)] // 2 GB
        [RequestFormLimits(MultipartBodyLengthLimit = 2147483648)]
        public async Task<ActionResult<ApiResponse<FileUploadResponseDto>>> UploadVideo(int lessonId, IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                var errorResponse = ApiResponse<FileUploadResponseDto>.ErrorResponse(
                    "No file provided",
                    statusCode: 400
                );
                return BadRequest(errorResponse);
            }

            try
            {
                var result = await _fileUploadService.UploadLessonContentAsync(lessonId, file, LessonType.video);
                var response = ApiResponse<FileUploadResponseDto>.SuccessResponse(
                    result,
                    "Video uploaded successfully"
                );
                return Ok(response);
            }
            catch (ArgumentException ex)
            {
                var response = ApiResponse<FileUploadResponseDto>.ErrorResponse(ex.Message, statusCode: 400);
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                var response = ApiResponse<FileUploadResponseDto>.ErrorResponse(
                    "File upload failed",
                    new List<string> { ex.Message },
                    500
                );
                return StatusCode(500, response);
            }
        }

        /// <summary>
        /// Upload PDF document for a lesson - Max 100MB
        /// </summary>
        [HttpPost("pdf/{lessonId}")]
        [ProducesResponseType(typeof(ApiResponse<FileUploadResponseDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<FileUploadResponseDto>), StatusCodes.Status400BadRequest)]
        [RequestSizeLimit(104857600)] // 100 MB
        [RequestFormLimits(MultipartBodyLengthLimit = 104857600)]
        public async Task<ActionResult<ApiResponse<FileUploadResponseDto>>> UploadPdf(int lessonId, IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                var errorResponse = ApiResponse<FileUploadResponseDto>.ErrorResponse(
                    "No file provided",
                    statusCode: 400
                );
                return BadRequest(errorResponse);
            }

            try
            {
                var result = await _fileUploadService.UploadLessonContentAsync(lessonId, file, LessonType.PDF);
                var response = ApiResponse<FileUploadResponseDto>.SuccessResponse(
                    result,
                    "PDF uploaded successfully"
                );
                return Ok(response);
            }
            catch (ArgumentException ex)
            {
                var response = ApiResponse<FileUploadResponseDto>.ErrorResponse(ex.Message, statusCode: 400);
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                var response = ApiResponse<FileUploadResponseDto>.ErrorResponse(
                    "File upload failed",
                    new List<string> { ex.Message },
                    500
                );
                return StatusCode(500, response);
            }
        }

        /// <summary>
        /// Delete uploaded file
        /// </summary>
        [HttpDelete("{fileName}")]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResponse<object>>> DeleteFile(string fileName)
        {
            try
            {
                var result = await _fileUploadService.DeleteFileAsync(fileName);
                if (!result)
                {
                    var response = ApiResponse<object>.NotFoundResponse("File not found");
                    return NotFound(response);
                }

                var successResponse = ApiResponse<object>.SuccessResponse(
                    null,
                    "File deleted successfully"
                );
                return Ok(successResponse);
            }
            catch (Exception ex)
            {
                var response = ApiResponse<object>.ErrorResponse(ex.Message, statusCode: 500);
                return StatusCode(500, response);
            }
        }
    }
}
