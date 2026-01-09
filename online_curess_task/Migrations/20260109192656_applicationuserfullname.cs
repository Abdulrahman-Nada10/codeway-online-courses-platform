using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace online_curess_task.Migrations
{
    /// <inheritdoc />
    public partial class applicationuserfullname : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FullNam",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FullNam",
                table: "AspNetUsers");
        }
    }
}
