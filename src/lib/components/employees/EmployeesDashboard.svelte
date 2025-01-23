<script lang="ts">
    
    import Circle from "$lib/atoms/graphs/Circle.svelte";
    import Line from "$lib/atoms/graphs/Line.svelte";
    import SemiCircle from "$lib/atoms/graphs/SemiCircle.svelte";
    import { graphColors } from "$lib/utills/constants/CSS";
    import Labels from "$lib/atoms/employees/Labels.svelte";
    import Dropdown from "$lib/atoms/common/Inputs/Dropdown.svelte";
    import Input from "$lib/atoms/common/Inputs/Input.svelte";
    import { staticImages } from "$lib/utills/constants/staticImages";
    import EmployeeTable from "$lib/components/employees/Tables/EmployeeTable.svelte";
    import { onMount } from "svelte";
    import { excelLoadingStore } from "$lib/stores/commonStore";
    import lottie from 'lottie-web';
    import Toast from "$lib/atoms/common/Toast.svelte";
    
    

    const textCommonCssClasses = {
        heading: "text-4xl font-bold text-black mt-[4px]",
        subHeading: "text-base font-semibold text-black",
        text: "text-xs text-[#5F6969] font-medium",
        pageHeading: "text-xl font-bold text-black",
    };

    onMount(() => {
        if($excelLoadingStore.generateCelebs){
            setTimeout(() => {
                $excelLoadingStore.generateCelebs = false;
            }, 3000);
        }
    });

    let container: HTMLElement;

    onMount(() => {
        let animation: any;
        
        if (container) {
            (async () => {
                try {
                    const response = await fetch('/animations/celebAnim.json');
                    const animationData = await response.json();
                    
                    animation = lottie.loadAnimation({
                        container: container,
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        animationData: animationData
                    });
                } catch (error) {
                    console.error('Error loading animation:', error);
                }
            })();
        }

        return () => animation?.destroy();
    });

</script>
<div class="h-[85vh] overflow-y-auto">
   
    {#if $excelLoadingStore.generateCelebs}
        <div bind:this={container} class="w-[600px] h-[600px] absolute bottom-[100px] right-1/2 translate-x-1/2  bg-transparent z-50"></div>
        <Toast message="Employees successfully added" variant="outline" onClose={() => {}} />
    {/if}
    
  
    <div class="p-[32px] w-full">
        <div class="flex gap-[16px] w-full">
            <div
                class="p-[16px] bg-white rounded-[16px] min-w-[275px] w-[25%]"
            >
                <div class="flex items-center justify-between">
                    <div class="flex flex-col">
                        <p class={textCommonCssClasses.text}>Nationality</p>
                        <p class={textCommonCssClasses.heading}>25</p>
                        <p class={textCommonCssClasses.subHeading}>
                            Singaporeans
                        </p>
                    </div>
                    <Circle
                        values={[30, 15, 45, 10]}
                        labels={[
                            "Singaporeans",
                            "PR",
                            "Foreigners",
                            "Others",
                        ]}
                    />
                </div>
                <div class="mt-[16px]">
                    <Labels
                        labels={[
                            "Singaporeans",
                            "PR",
                            "Foreigners",
                            "Others",
                        ]}
                        colors={[
                            graphColors.green,
                            graphColors.purple,
                            graphColors.yellow,
                            graphColors.gray,
                        ]}
                        actualValues={[30, 15, 45, 10]}
                    />
                </div>
            </div>
            <div
                class="p-[16px] bg-white rounded-[16px] min-w-[457px] w-[45%]"
            >
                <div class="flex flex-col mb-[10px]">
                    <p class={textCommonCssClasses.text}>Employment Type</p>
                    <p class={textCommonCssClasses.heading}>13</p>
                    <p class={textCommonCssClasses.subHeading}>
                        Full Timers
                    </p>
                </div>
                <Line
                    values={[30, 40, 15, 15]}
                    labels={[
                        "Full Timers",
                        "Part Timers",
                        "Contractors",
                        "Interns",
                    ]}
                />
            </div>
            <div
                class="p-[16px] bg-white rounded-[16px] flex flex-col min-w-[360px] w-[35%]"
            >
                <div class="flex items-center justify-between h-full">
                    <div class="flex flex-col">
                        <p class={textCommonCssClasses.text}>
                            Employee Status
                        </p>
                        <p class={textCommonCssClasses.heading}>25</p>
                        <p class={textCommonCssClasses.subHeading}>
                            Active Employees
                        </p>
                    </div>
                    <SemiCircle
                        radius={67}
                        width={136}
                        height={100}
                        values={[40, 50, 10]}
                        labels={["Active", "Invite Sent", "Payroll Only"]}
                    />
                </div>
                <div class="flex h-full items-end">
                    <Labels
                        labels={["Active", "Invite Sent", "Payroll Only"]}
                        colors={[
                            graphColors.green,
                            graphColors.purple,
                            graphColors.yellow,
                        ]}
                        actualValues={[40, 50, 10]}
                    />
                </div>
            </div>
        </div>
        <div class="mt-[24px] flex w-full justify-between items-center">
            <p class={textCommonCssClasses.pageHeading}>All Employees</p>
            <div class="flex gap-[16px] items-center w-fit">
                <Input
                    placeholder="Search employee"
                    style="w-[200px] bg-transparent"
                    icon={staticImages.searchIcon}
                    onChange={() => {}}
                    value=""
                />
                <Dropdown
                    title="All Status"
                    options={[
                        { text: "Active", value: "active" },
                        { text: "Invite Sent", value: "Invite Sent" },
                        { text: "Payroll Only", value: "Payroll Only" },
                    ]}
                    value=""
                    onChange={() => {}}
                    style="min-w-[120px] max-w-fit"
                />
                <Dropdown
                    title="All Role"
                    options={[
                        { text: "Senior Manager", value: "senior_manager" },
                        { text: "Manager", value: "manager" },
                        {
                            text: "Senior Associate",
                            value: "senior_associate",
                        },
                        { text: "Associate", value: "associate" },
                    ]}
                    value=""
                    onChange={() => {}}
                    style="min-w-[120px] max-w-fit"
                />
            </div>
        </div>
        <div class="mt-[24px] w-full h-full">
            <EmployeeTable />
        </div>
    </div>
</div>