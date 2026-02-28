namespace GlobalResponse.Shared;

public class DuplicateProtectionOptions
{
    public int TimeToLiveSeconds { get; set; }
    public Dictionary<string, string> Messages { get; set; } = [];
    public List<string> ExcludedRoutes { get; set; } = []; // add excluded paths
}

