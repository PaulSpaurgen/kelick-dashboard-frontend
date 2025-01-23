<script lang="ts">
    import Table from "$lib/atoms/common/Table/Table.svelte";
    import EmployeeTableRow from "./EmployeeTableRow.svelte";
    import { employeeStore } from "$lib/stores/employeeStore";

    $: selectAll = false;
</script>

<Table
    headings={[
        { id: "employeeId", label: "Employee ID", sortable: true },
        { id: "employeeProfile", label: "Employee Profile", sortable: true },
        { id: "email", label: "Email", sortable: true },
        { id: "role", label: "Role", sortable: true },
        { id: "status", label: "Status", sortable: true },
    ]}
    sortBy={null}
    bind:selectAll
>

    {#each $employeeStore as employee}
        <tr class="bg-white border-border border-b-[1px] hover:bg-background cursor-pointer">
            <EmployeeTableRow {employee} />
        </tr>
    {/each}
    
</Table>

