namespace online_curess_task.Repositories.IRepositories
{
    public interface IUnitOfWork:IDisposable
    {
        public IScormStatmentRepository ScormStatmentRepository { get; }
    }
}
