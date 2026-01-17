namespace CourseMangment.MicroService.Application.DTO_s
{
    public class PagedResultDto<T>
    {
        public List<T> Items { get; set; } = new();
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
        public PagedResultDto() { }

        //public PagedResultDto(List<T> items, int totalCount, int pageNumber, int pageSize)
        //{
        //    Items = items;
        //    TotalCount = totalCount;
        //    PageNumber = pageNumber;
        //    PageSize = pageSize;
        //}
    }
}
