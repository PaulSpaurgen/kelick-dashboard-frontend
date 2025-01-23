<script lang="ts">
    import type { Status } from "$lib/utills/Types/employeeTypes";
    
    export let status: Status;
    const statusMap = {
        ACTIVE: {
            label: 'Active',
            bgColor: 'bg-[#E2FFFD]',
            textColor: 'text-[#02B9B0]'
        },
        PRONLY: {
            label: 'Payroll Only', 
            bgColor: 'bg-[#F1F5F9]',
            textColor: 'text-[#5F6969]'
        },
        INVSNT: {
            label: 'Invite Sent',
            bgColor: 'bg-[#F2E5FF]', 
            textColor: 'text-[#8318E7]'
        }
    };

    const defaultStatus = {
        label: 'Unknown',
        bgColor: 'bg-gray-200',
        textColor: 'text-gray-600'
    };

    $: currentStatus = statusMap[status] || defaultStatus;
</script>

<div class={`inline-flex px-[12px] py-[4px] rounded-[12px] ${currentStatus.bgColor}`}>
    <span class={`text-[14px] font-semibold ${currentStatus.textColor} flex items-center`}>
        <span class="inline-block mr-[4px] text-[26px] font-semibold">•</span>
       {currentStatus.label}
    </span>
</div>
