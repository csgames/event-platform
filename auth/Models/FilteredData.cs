namespace STS.Models
{
    public class FilteredData<T>
    {
        public T[] Data { get; set; }
        public int Total { get; set; }
    }
}