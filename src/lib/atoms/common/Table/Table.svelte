<script lang="ts">
  import { staticImages } from "$lib/utills/constants/staticImages";

  export let headings: {
    id: string;
    label: string;
    sortable: boolean;
  }[] = [];

  export let sortBy: string | null = null;
  export let selectAll: boolean = false;

  // Create refs for parent component to bind to
  export let onSort: ((headingId: string) => void) | null = null;
 


  let sortDirection: "asc" | "desc" | null = null;



  function handleSort(headingId: string) {
    if (sortBy === headingId) {
      sortDirection = sortDirection === "asc" ? "desc" : "asc";
    } else {
      sortBy = headingId;
      sortDirection = "asc";
    }
    if (onSort) {
      onSort(headingId);
    }
  }

  function handleSelectAll() {
    selectAll = !selectAll;
  }
</script>

<div class="overflow-x-auto rounded-box border border-border bg-transparent">
  <table class="table">
    <thead>
      <tr class="border-b border-border">
        <th class="w-[10px]">
          <input
            type="checkbox"
            checked={selectAll}
            on:change={handleSelectAll}
            class="checkbox"
          />
        </th>
        {#each headings as heading, i}
          <th
            class:cursor-pointer={heading.sortable}
            on:click={() => heading.sortable && handleSort(heading.id)}
          >
            <div class="flex items-center justify-between text-[#5F6969] text-[16px] font-medium tracking-wider">
              <span>{heading.label}</span>
              {#if heading.sortable}
                <span
                  class="inline-block transition-transform duration-300"
                  class:rotate-180={sortBy === heading.id && sortDirection === "desc"}
                >
                  <img src={staticImages.sortIcon} alt="sort" />
                </span>
              {/if}
            </div>
          </th>
        {/each}
      </tr>
    </thead>
    <tbody >
      <slot/>

    </tbody>
  </table>
</div>
