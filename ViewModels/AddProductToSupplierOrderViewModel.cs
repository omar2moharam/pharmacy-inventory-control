// ViewModels/AddProductToSupplierOrderViewModel.cs
using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace PharmacyInventorySystem.ViewModels
{
    public class AddProductToSupplierOrderViewModel
    {
        public int SupplierOrderID { get; set; }

        [Required(ErrorMessage = "Please Choose medicine")]
        public string ProductName { get; set; }

        [Required]
        [Range(0.01, double.MaxValue)]
        public decimal BUnitPrice { get; set; } // Buying price per box

        [Required]
        [Range(0.01, double.MaxValue)]
        public decimal BPPrice { get; set; } // Selling price per box

        [Required]
        public float Quantity { get; set; } // Number of boxes

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Units per box must be at least 1")]
        public int UnitPerPackage { get; set; } // Units in each box

        public int UnitQuantity { get; set; } // Computed = Quantity * UnitPerPackage

        public decimal SUnitPrice { get; set; } // Computed
        public decimal SPPrice { get; set; } // Computed

        [Required]
        public DateTime ExDate { get; set; }

        public string PatchNom { get; set; }

        [Required]
        public int CategoryID { get; set; }

        public IEnumerable<SelectListItem>? Categories { get; set; }
    }

}