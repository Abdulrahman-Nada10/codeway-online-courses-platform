using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CourseMangment.MicroService.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddInstructorTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "CourseQueryParameters");

            migrationBuilder.CreateTable(
                name: "Instructors",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Bio = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Instructors", x => x.Id);
                });

            // 1) أضف العمود بدون DefaultGuid.Empty
            migrationBuilder.AddColumn<Guid>(
                name: "InstructorId",
                table: "Courses",
                type: "uniqueidentifier",
                nullable: true); // خليه nullable مؤقتًا

            migrationBuilder.AddColumn<string>(
                name: "TitleAr",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TitleEn",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            // 2) أضف Instructor افتراضي واربطي كل الكورسات بيه
            var defaultInstructorId = Guid.NewGuid();

            migrationBuilder.Sql($@"
        INSERT INTO Instructors (Id, Name, Bio, Email, CreatedAt)
        VALUES ('{defaultInstructorId}', 'Default Instructor', 'Default bio', 'default@instructor.com', GETUTCDATE());
        
        UPDATE Courses
        SET InstructorId = '{defaultInstructorId}'
        WHERE InstructorId IS NULL;
    ");

            // 3) خليه Not Null بعد ما ظبطنا الداتا (اختياري، أو سيبه nullable)
            migrationBuilder.AlterColumn<Guid>(
                name: "InstructorId",
                table: "Courses",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Courses_InstructorId",
                table: "Courses",
                column: "InstructorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Instructors_InstructorId",
                table: "Courses",
                column: "InstructorId",
                principalTable: "Instructors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
    

    //public partial class AddInstructorTable : Migration
    //{
    //    /// <inheritdoc />
    //    protected override void Up(MigrationBuilder migrationBuilder)
    //    {
    //        migrationBuilder.DropColumn(
    //            name: "CategoryId",
    //            table: "CourseQueryParameters");

    //        migrationBuilder.AddColumn<Guid>(
    //            name: "InstructorId",
    //            table: "Courses",
    //            type: "uniqueidentifier",
    //            nullable: false,
    //            defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

    //        migrationBuilder.AddColumn<string>(
    //            name: "TitleAr",
    //            table: "Courses",
    //            type: "nvarchar(max)",
    //            nullable: false,
    //            defaultValue: "");

    //        migrationBuilder.AddColumn<string>(
    //            name: "TitleEn",
    //            table: "Courses",
    //            type: "nvarchar(max)",
    //            nullable: false,
    //            defaultValue: "");

    //        migrationBuilder.CreateTable(
    //            name: "Instructors",
    //            columns: table => new
    //            {
    //                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
    //                Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
    //                Bio = table.Column<string>(type: "nvarchar(max)", nullable: false),
    //                Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
    //                CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
    //            },
    //            constraints: table =>
    //            {
    //                table.PrimaryKey("PK_Instructors", x => x.Id);
    //            });

    //        migrationBuilder.CreateIndex(
    //            name: "IX_Courses_InstructorId",
    //            table: "Courses",
    //            column: "InstructorId");

    //        migrationBuilder.AddForeignKey(
    //            name: "FK_Courses_Instructors_InstructorId",
    //            table: "Courses",
    //            column: "InstructorId",
    //            principalTable: "Instructors",
    //            principalColumn: "Id",
    //            onDelete: ReferentialAction.Cascade);
    //    }

    //    /// <inheritdoc />
    //    protected override void Down(MigrationBuilder migrationBuilder)
    //    {
    //        migrationBuilder.DropForeignKey(
    //            name: "FK_Courses_Instructors_InstructorId",
    //            table: "Courses");

    //        migrationBuilder.DropTable(
    //            name: "Instructors");

    //        migrationBuilder.DropIndex(
    //            name: "IX_Courses_InstructorId",
    //            table: "Courses");

    //        migrationBuilder.DropColumn(
    //            name: "InstructorId",
    //            table: "Courses");

    //        migrationBuilder.DropColumn(
    //            name: "TitleAr",
    //            table: "Courses");

    //        migrationBuilder.DropColumn(
    //            name: "TitleEn",
    //            table: "Courses");

    //        migrationBuilder.AddColumn<int>(
    //            name: "CategoryId",
    //            table: "CourseQueryParameters",
    //            type: "int",
    //            nullable: true);
    //    }
}

