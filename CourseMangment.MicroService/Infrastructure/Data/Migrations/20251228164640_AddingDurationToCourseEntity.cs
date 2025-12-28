using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CourseMangment.MicroService.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddingDurationToCourseEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Duration",
                table: "Categories",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Categories");
        }
    }
}
