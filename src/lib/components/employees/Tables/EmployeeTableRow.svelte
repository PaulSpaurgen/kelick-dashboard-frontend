<script lang="ts">  
    import Avatar from "$lib/atoms/common/Avatar.svelte";
    import StatusLabel from "$lib/atoms/common/StatusLabel.svelte";
    import type { Employee, Status } from "$lib/utills/Types/employeeTypes";

    export let employee: Employee;
</script>

<td>
    <input type="checkbox" class="checkbox" />
</td>
<td>
    <p class="text-primary text-[14px] font-semibold underline cursor-pointer">{employee.employeeId}</p>
</td>
<td>
    <Avatar 
        name={employee.name}
        variant="outline"
    />
</td>
<td>
    <p class="text-[14px] font-semibold text-text-active">{employee.email}</p>
</td>
<td>
    <p class="text-[14px] font-semibold text-text-active">{employee.role}</p>
</td>
<td>
    <StatusLabel status={employee.status as Status} />
</td>