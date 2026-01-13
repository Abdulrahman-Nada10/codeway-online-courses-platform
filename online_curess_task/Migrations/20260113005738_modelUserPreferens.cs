using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace online_curess_task.Migrations
{
    /// <inheritdoc />
    public partial class modelUserPreferens : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "userPreferences",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ApplicationUserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ThemeType = table.Column<int>(type: "int", nullable: false),
                    langaugeType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_userPreferences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_userPreferences_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_userPreferences_ApplicationUserId",
                table: "userPreferences",
                column: "ApplicationUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "userPreferences");
        }
    }
}
