using online_curess_task.Modle.Enums;
using System.ComponentModel.DataAnnotations;

namespace online_curess_task.Modle
{
    public class UserPreference
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public string ApplicationUserId { get; set; } = string.Empty;
        public ApplicationUser ApplicationUser { get; set; } = null!;
        public ThemeType ThemeType { get; set; }
        public LangaugeType langaugeType { get; set; }
    }
}
