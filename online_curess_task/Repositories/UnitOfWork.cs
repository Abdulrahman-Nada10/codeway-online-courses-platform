using online_curess_task.Data;
using online_curess_task.Repositories.IRepositories;

namespace online_curess_task.Repositories
{
    public class UnitOfWork: IUnitOfWork
    {
        private readonly ApplicationDbContext _context;

        public UnitOfWork(ApplicationDbContext context,
            IScormStatmentRepository scormStatmentRepository) 
        {
            _context = context;
            ScormStatmentRepository = scormStatmentRepository;
        }

        public IScormStatmentRepository ScormStatmentRepository { get; }

        public void Dispose()
        {
          _context.Dispose();
        }
    }
}
