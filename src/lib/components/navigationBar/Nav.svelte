<script lang="ts">
    import { page } from "$app/stores";
    import { staticImages } from "$lib/utills/constants/staticImages";
    import NavElement from "$lib/atoms/navBar/NavElement.svelte";
    import { URLS } from "$lib/utills/constants/urls";
    import ProgressBar from "$lib/atoms/common/progressBar.svelte";
    import Avatar from "$lib/atoms/common/Avatar.svelte";
    import NavDropdown from "$lib/atoms/navBar/NavDropdown.svelte";
    import { navStore } from "$lib/stores/commonStore";
    import { browser } from '$app/environment';



    $: activeLink = $page.url.pathname;
    
    $: links = [
        {
            id: 1,
            label: "Employees",
            url: URLS.EMPLOYEES,
            icon: staticImages.employees,
        },
        {
            id: 2,
            label: "Payroll",
            url: URLS.PAYROLL,
            icon: staticImages.payroll,
        },
        {
            id: 3,
            label: "Leaves",
            url: URLS.LEAVES,
            icon: staticImages.leaves,
        },
        {
            id: 4,
            label: "Claims",
            url: URLS.CLAIMS,
            icon: staticImages.claims,
        },
        {
            id: 5,
            label: "Attendance",
            url: URLS.ATTENDANCE,
            icon: staticImages.attendance,
        },
        {
            id: 6,
            label: "Performance",
            url: URLS.PERFORMANCE,
            icon: staticImages.performance,
        },
        {
            id: 7,
            label: "Documents",
            url: URLS.DOCUMENTS,
            icon: staticImages.documents,
        },
        {
            id: 8,
            label: "Settings",
            url: URLS.SETTINGS,
            icon: staticImages.settings,
        },
    ];

    $: dropdownLinks = [
        {
            icon: staticImages.company,
            text: "Kelick",
            url: "#",
            isActive: false
        }
    ];

    $: if(browser && links.some(link => link.url === activeLink) && $navStore.isViewMore){
        const element = document.getElementById(activeLink);
        if(element){
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 500);
        }
    }
</script>

<div
    class="h-screen bg-white min-w-[252px] p-[16px] border-r-[1px] border-border relative"
>
    <div class="px-[8px] pr-[18px]">
        <img src={staticImages.logo} alt="logo" class="w-[100px] h-auto" />
    </div>
    <div class="mt-[20px] flex flex-col gap-[20px]">
        <a href={URLS.DASHBOARD}>
            <NavElement
                icon={staticImages.dashboard}
                text="Dashboard"
                isActive={activeLink === URLS.DASHBOARD}
            />
        </a>
    </div>

    <!-- dropdown -->
    <div class="mt-[20px]">
        <NavDropdown title="ORGANIZATION" navElements={dropdownLinks} />
    </div>
    <!-- manage -->
    <div >
        <p
        class="text-[16px] text-[#7A8484] tracking-[2px] uppercase mt-[20px] pl-[16px] font-bold mb-[12px]"
    >
        manage
    </p>
    <div
        class="flex flex-col gap-[12px] pr-[16px] transition-all duration-500 ease-in-out {$navStore.isViewMore
            ? 'h-[284px] overflow-y-scroll '
            : 'h-[220px] overflow-y-hidden'}"
    >
        {#each links as link}
            <a href={link.url} id={`${link.url}`} class="{links.indexOf(link) === links.length - 1 ? 'pb-[12px]' : ''}">
                <NavElement
                    icon={link.icon}
                    text={link.label}
                    isActive={activeLink === link.url}
                />
            </a>
        {/each}
    </div>
    
    <button on:click={() => navStore.toggleViewMore()}>
        <NavElement
            icon={staticImages.viewMore}
            text={$navStore.isViewMore ? 'Less' : 'More'}
            isActive={false}
        />
    </button>
    </div>
   

    <div class="absolute bottom-0 left-0 w-full p-[16px] h-fit bg-white">
        <div
            class="border-t-[1px] border-border px-[16px] py-[8px] flex flex-col"
        >
            <div class="flex items-center w-full gap-[10px] py-[10px]">
                <img
                    src={staticImages.wallet}
                    alt="wallet"
                    class="w-[24px] h-auto"
                />
                <p class="text-[16px] font-normal">Free Plan</p>
            </div>
            <div class="mt-[10px] mb-[16px]">
                <p class="text-[12px] mb-[8px]">1/10 Employees</p>
                <ProgressBar width={10} />
            </div>

            <div class="mt-[4px] border-t-[1px] border-border">
                <div
                    class="flex items-center w-full gap-[10px] mt-[12px] py-[10px]"
                >
                    <div class="flex items-center gap-[10px]">
                        <img
                            src={staticImages.notification}
                            alt="wallet"
                            class="w-[24px] h-auto"
                        />
                        <p class="text-[16px] font-normal">Notification</p>
                    </div>
                    <div
                        class="w-2 h-2 rounded-full bg-[#FF6565] ml-auto"
                    ></div>
                </div>
            </div>
            <div class="mt-[8px] py-[10px]">
                <Avatar name="John Doe" email="john.doe@example.com" />
            </div>
        </div>
    </div>
</div>
