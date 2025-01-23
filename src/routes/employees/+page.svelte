<script lang="ts">
  import HeaderBar from "$lib/atoms/common/headerBar.svelte";
  import EmployeesInit from "$lib/components/employees/EmployeesInit.svelte";
  import EmployeesDashboard from "$lib/components/employees/EmployeesDashboard.svelte";
  import { employeeStore } from "$lib/stores/employeeStore";
  import { excelLoadingStore } from "$lib/stores/commonStore";
  import Loader from "$lib/atoms/common/loader.svelte";
  import ExcelUploadModal from "$lib/components/employees/Modals/ExcelUploadModal.svelte";
  import ModalButton from "$lib/atoms/common/Modal/ModalButton.svelte";
  import { staticImages } from "$lib/utills/constants/staticImages";
  import Button from "$lib/atoms/common/Inputs/Button.svelte";

  $: console.log("employees", $employeeStore);
</script>

<div class="w-full h-full ">
  <HeaderBar title = "Employees" >
    <div slot="actions" class="flex gap-[16px]">
      {#if $employeeStore.length > 0}
        <ExcelUploadModal id="excelUploadModal" title="Bulk Upload" />
        <ModalButton id="excelUploadModal" type="open" variant="primary" icon={staticImages.addEmployee} >Add Employee</ModalButton>
        <Button variant="outline" on:click={()=>{
          employeeStore.reset();
        }}>Reset Employees</Button>
      {/if}
    </div>
  </HeaderBar>
  {#if $excelLoadingStore.isExcelLoading}
    <Loader />
  {:else if $employeeStore.length > 0}
    <EmployeesDashboard />
  {:else}
    <EmployeesInit />
  {/if}

</div>
