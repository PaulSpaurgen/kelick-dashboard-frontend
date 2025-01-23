<script lang="ts">
    import Button from "$lib/atoms/common/Inputs/Button.svelte";
    import ModalButton from "$lib/atoms/common/Modal/ModalButton.svelte";
    import { staticImages } from "$lib/utills/constants/staticImages";
    import ExcelUploadModal from "./Modals/ExcelUploadModal.svelte";

</script>
<div  class="w-full ">
    <ExcelUploadModal id="importTeam" title="Bulk Upload" />
    

    <div class="w-full  p-[32px]">
        <div
            class="w-full h-fit py-[62px] px-[24px] bg-white rounded-[16px] flex flex-col items-center justify-between"
        >
            <img
                src={staticImages.employeeBg}
                alt="employeeBg"
                class="w-[200px] h-[200px]"
            />
            <p class="text-[30px] font-bold text-black">
                Start building your team
            </p>
            <p class="text-base font-medium text-[#5F6969]">
                Add your first team member or import your entire team.
            </p>
            <div
                class="w-full flex items-center justify-center gap-[16px] mt-[32px]"
            >
                <ModalButton
                    id="importTeam"
                    variant="outline"
                    icon={staticImages.importTeam}>Bulk Upload</ModalButton
                >
                <Button variant="primary" icon={staticImages.addEmployee}
                    >Add Employee</Button
                >
            </div>
        </div>
    </div>
</div>