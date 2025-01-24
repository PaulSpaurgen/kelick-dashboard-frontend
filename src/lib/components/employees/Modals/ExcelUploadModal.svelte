<script lang="ts">
    import * as XLSX from "xlsx";
    import Modal from "$lib/atoms/common/Modal/Modal.svelte";
    import Button from "$lib/atoms/common/Inputs/Button.svelte";
    import { staticImages } from "$lib/utills/constants/staticImages";
    import { excelLoadingStore } from "$lib/stores/commonStore";
    import ModalButton from "$lib/atoms/common/Modal/ModalButton.svelte";
    import { employeeStore } from "$lib/stores/employeeStore";
    // import excelToJson from "excel-to-json";

    export let id: string;
    export let title: string;

    let files: File[] = [];
    // or if using reactive declaration
    $: files = [] as File[];

    const handleDownload = () => {
        const fileUrl = "/docs/sample.xlsx";
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = "sample.xlsx"; // Suggested filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const onUpload = (file: File) => {
        // Check if file with same name already exists
        const existingFile = files.find((f) => f.name === file.name);
        if (existingFile) {
            // Remove the existing file first
            files = files.filter((f) => f.name !== file.name);
            // Revoke object URL if it exists
            URL.revokeObjectURL(URL.createObjectURL(existingFile));
        }
        // Add the new file
        files = [...files, file];
    };

    const onRemove = async (file: File) => {
        console.log("Removing files:", file);
        // Remove from files array
        files = files.filter((f) => f !== file);

        // Create URL for the file
        const fileUrl = URL.createObjectURL(file);

        try {
            // Revoke the object URL to free up memory
            URL.revokeObjectURL(fileUrl);
            console.log("File removed successfully");
        } catch (err) {
            console.error("Error removing file:", err);
        }
    };

    const handleContinue = async () => {
        if (files.length === 0) {
            console.error("No files selected");
            alert("Please select at least one file");
            return;
        }

        $excelLoadingStore.isExcelLoading = true;

        let allData: any[] = [];

        for (const file of files) {
            const reader = new FileReader();

            try {
                const fileData = await new Promise((resolve, reject) => {
                    reader.onload = (e) => {
                        try {
                            const data = new Uint8Array(
                                e.target?.result as ArrayBuffer,
                            );
                            const workbook = XLSX.read(data, { type: "array" });

                            // Get first sheet
                            const firstSheet =
                                workbook.Sheets[workbook.SheetNames[0]];

                            // Convert to JSON
                            const jsonData =
                                XLSX.utils.sheet_to_json(firstSheet);
                            resolve(jsonData);
                        } catch (err) {
                            reject(err);
                        }
                    };
                    reader.onerror = (err) => reject(err);
                    reader.readAsArrayBuffer(file);
                });

                allData = [...allData, fileData];
                console.log("Parsed Excel data for file:", file.name, fileData);
            } catch (err) {
                console.error("Error parsing Excel file:", file.name, err);
            }
        }
        setTimeout(() => {
            $excelLoadingStore.isExcelLoading = false;
            $excelLoadingStore.generateCelebs = true;
        }, 2000);
        const finalData = allData.flat().map((item: any, index: number) => ({
            ...item,
            id: `emp_${Date.now()}_${index}`,
        }));
        employeeStore.add(finalData);
    };
</script>

<Modal {id} {title}>
    <div slot="body">
        <div class="w-full">
            <div
                role="button"
                tabindex="0"
                class="w-[552px] h-[230px] mt-[24px] border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-background hover:bg-backgroundHover transition-colors"
                on:dragover|preventDefault
                on:drop|preventDefault={(e) => {
                    const file = e.dataTransfer?.files[0];
                    if (file) {
                        if (
                            file.type ===
                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                            file.type === "application/vnd.ms-excel" ||
                            file.type === "text/csv"
                        ) {
                            // Handle Excel file upload
                            onUpload(file);
                            console.log("Excel file:", file);
                        } else {
                            alert("Please upload only Excel or CSV files");
                        }
                    }
                }}
                on:keydown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        // Trigger file input click on Enter or Space
                        const fileInput = e.currentTarget.querySelector(
                            'input[type="file"]',
                        ) as HTMLInputElement;
                        if (fileInput) {
                            fileInput.click();
                        }
                    }
                }}
                on:click={(e) => {
                    const fileInput = e.currentTarget.querySelector(
                        'input[type="file"]',
                    ) as HTMLInputElement;
                    if (fileInput) {
                        fileInput.click();
                    }
                }}
                aria-label="Drop Excel or CSV file here or click to browse"
            >
                <img
                    src={staticImages.emptyState}
                    alt="upload icon"
                    class="w-[72px] h-[72px]"
                />
                <p class="text-text-secondary text-base font-medium">
                    Drag and drop your Excel or CSV file here
                </p>
                <p class="text-text-secondary text-base font-medium">
                    or <span class="font-bold underline">click to upload</span>
                </p>
                <input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    class="hidden"
                    on:change={(e) => {
                        const target = e.target as HTMLInputElement;
                        const file = target.files?.[0];

                        if (file) {
                            // Handle Excel file upload
                            onUpload(file);
                            console.log("Excel file:", file);
                            // Reset input value to allow re-uploading same file
                            target.value = "";
                        }
                    }}
                />
            </div>
            <div
                class="flex items-center justify-between w-full text-xs font-semibold text-text-secondary"
            >
                <p>Supported formats: XLS, CSV</p>
                <p>Maximum file size: 25MB</p>
            </div>

            <div
                class="w-full flex items-center bg-backgroundHover rounded-2xl mt-[24px] p-[16px] gap-[30px]"
            >
                <div class="flex items-center gap-[16px]">
                    <img
                        src={staticImages.xcelImg}
                        alt="xcelImg "
                        class="w-[40px] h-[40px]"
                    />
                    <div class="flex flex-col gap-[4px]">
                        <p class="text-base font-semibold text-black">
                            Table Example
                        </p>
                        <p
                            class="text-xs font-medium text-text-secondary max-w-[270px]"
                        >
                            You can download the attached example and use them
                            as a starting point for your own file.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        icon={staticImages.download}
                        style="w-[153px] text-xs"
                        on:click={handleDownload}
                    >
                        Download XLSX
                    </Button>
                </div>
            </div>
            {#each files as file}
                <div
                    class="flex w-full items-center justify-between gap-[16px] mt-[16px] cursor-pointer hover:bg-backgroundHover rounded-xl p-[8px] px-[16px] "
                >
                    <div class="flex items-center gap-[16px]">
                        <img
                            src={staticImages.xcelImg}
                            alt="Excel file"
                            class="w-[20px] h-[20px]"
                        />
                        <p class="text-sm font-medium text-text-inactive">
                            {file.name}
                        </p>
                    </div>
                    <button
                        on:click={() => onRemove(file)}
                        class="flex items-center gap-[16px] hover:scale-110 transition-transform duration-200"
                    >
                        <img
                            src={staticImages.deleteIcon}
                            alt="delete icon"
                            class="w-[20px] h-[20px] cursor-pointer"
                        />
                    </button>
                </div>
            {/each}
        </div>
    </div>
    <div slot="footer">
        <div class="flex w-full items-center justify-end gap-[16px] mt-[12px]">
            <ModalButton {id} type="cancel" variant="outline"
                >Cancel</ModalButton
            >
            <Button variant="primary" on:click={handleContinue}>Continue</Button
            >
        </div>
    </div>
</Modal>
