using online_curess_task.Modle.Enums;
using online_curess_task.Validation;

namespace online_curess_task.DTOs.UserPreference
{
    public class UserPreferencesDto
    {
        [EnumValidation(typeof(LangaugeType))]
        public LangaugeType langaugeType {  get; set; }
        [EnumValidation(typeof(ThemeType))]
        public ThemeType themeType { get; set; }
    }
}
