using System.ComponentModel.DataAnnotations;

namespace online_curess_task.Validation
{
    public class EnumValidationAttribute:ValidationAttribute
    {
        private readonly Type _enumtype;

        public EnumValidationAttribute(Type enumtype)
        {
            _enumtype = enumtype;
        }
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null)
                return ValidationResult.Success;
            if (!Enum.IsDefined(_enumtype, value))
            {
                return new ValidationResult($"Invalid value for {_enumtype.Name}");

            }

            return ValidationResult.Success;
        }
    }
}
