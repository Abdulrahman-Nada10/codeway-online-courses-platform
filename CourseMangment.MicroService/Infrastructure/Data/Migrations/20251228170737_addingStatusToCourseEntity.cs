using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CourseMangment.MicroService.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class addingStatusToCourseEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Courses");
        }
    }
}
