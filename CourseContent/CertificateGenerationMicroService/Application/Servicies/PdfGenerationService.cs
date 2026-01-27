using CertificateGenerationMicroService.Application.DTO_s;
using CertificateGenerationMicroService.Application.Interfaces;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace CertificateGenerationMicroService.Application.Servicies
{
    public class PdfGenerationService : IPdfGenerationService
    {
        private readonly ILogger<PdfGenerationService> _logger;

        public PdfGenerationService(ILogger<PdfGenerationService> logger)
        {
            _logger = logger;
        }

        public byte[] GenerateCertificatePdf(CertificateResponse certificate)
        {
            try
            {
                // Configure QuestPDF license (Community license for free projects)
                QuestPDF.Settings.License = LicenseType.Community;

                using var stream = new MemoryStream();

                var document = Document.Create(container =>
                {
                    container.Page(page =>
                    {
                        page.Size(PageSizes.A4.Landscape());
                        page.Margin(50);
                        page.PageColor(Colors.White);

                        page.Content().Column(col =>
                        {
                            // Border decoration
                            col.Item().Border(3).BorderColor(Colors.Blue.Darken2).Padding(30).Column(innerCol =>
                            {
                                // Title
                                innerCol.Item().AlignCenter().PaddingBottom(20).Text("CERTIFICATE OF COMPLETION")
                                    .FontSize(36)
                                    .Bold()
                                    .FontColor(Colors.Blue.Darken2);

                                innerCol.Item().AlignCenter().PaddingBottom(10).LineHorizontal(2)
                                    .LineColor(Colors.Grey.Lighten2);

                                // "This certifies that" text
                                innerCol.Item().AlignCenter().PaddingTop(30).Text("This certifies that")
                                    .FontSize(16)
                                    .Italic();

                                // Student Name
                                innerCol.Item().AlignCenter().PaddingTop(15).Text(certificate.StudentName)
                                    .FontSize(28)
                                    .Bold()
                                    .FontColor(Colors.Black);

                                innerCol.Item().AlignCenter().PaddingTop(5).LineHorizontal(1)
                                    .LineColor(Colors.Grey.Medium);

                                // "has successfully completed" text
                                innerCol.Item().AlignCenter().PaddingTop(30).Text("has successfully completed the course")
                                    .FontSize(16)
                                    .Italic();

                                // Course Name
                                innerCol.Item().AlignCenter().PaddingTop(15).Text(certificate.CourseName)
                                    .FontSize(24)
                                    .Bold()
                                    .FontColor(Colors.Blue.Darken1);

                                innerCol.Item().AlignCenter().PaddingTop(5).LineHorizontal(1)
                                    .LineColor(Colors.Grey.Medium);

                                // Completion Date
                                innerCol.Item().AlignCenter().PaddingTop(40).Text($"Completed on {certificate.IssuedAt:MMMM dd, yyyy}")
                                    .FontSize(14);

                                // Verification Code at bottom
                                innerCol.Item().AlignCenter().PaddingTop(50).Text($"Verification Code: {certificate.VerificationCode}")
                                    .FontSize(11)
                                    .FontColor(Colors.Grey.Darken1);

                                // Certificate ID (smaller)
                                innerCol.Item().AlignCenter().PaddingTop(5).Text($"Certificate ID: {certificate.CertificateID}")
                                    .FontSize(9)
                                    .FontColor(Colors.Grey.Medium);
                            });
                        });
                    });
                });

                document.GeneratePdf(stream);

                _logger.LogInformation($"PDF generated successfully for certificate: {certificate.VerificationCode}");

                return stream.ToArray();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error generating PDF: {ex.Message}");
                throw;
            }
        }
    }
}
