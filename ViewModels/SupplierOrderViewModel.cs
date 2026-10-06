using System.ComponentModel.DataAnnotations;

namespace PharmacyInventorySystem.ViewModels
{
    public class SupplierOrderCreateViewModel
    {
        [Required(ErrorMessage = "The Supplier field is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Please select a supplier.")]
        public int SupplierID { get; set; }
    }
}
