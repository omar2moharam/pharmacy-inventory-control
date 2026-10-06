using PharmacyInventorySystem.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PharmacyInventorySystem.Services
{
    public interface ISupplierOrderService
    {
        Task<List<ManagerSupplierOrderViewModel>> GetAllOrdersForManagerAsync();
        Task<ManagerSupplierOrderDetailsViewModel?> GetOrderDetailsByIdAsync(int orderId);
    }
}
