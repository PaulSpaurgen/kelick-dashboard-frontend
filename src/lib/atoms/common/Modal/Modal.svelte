<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import gsap from 'gsap';
    
    export let id: string;
    export let title: string;
    export let width: string = 'w-12/12 max-w-[600px]';

    let contentWrapper: HTMLElement;
    let resizeObserver: ResizeObserver;
    let currentAnimation: gsap.core.Timeline;

    let currentHeight: number = 0;
    
    $: isAnimating = false;

    onMount(() => {
        if (contentWrapper) {
            resizeObserver = new ResizeObserver(() => {
               
                requestAnimationFrame(() => {
                    if(isAnimating) return;
                    isAnimating = true;
                    // Get current height before any changes
              
                    
                    // Temporarily set height to auto to get target height
                    contentWrapper.style.height = 'auto';
                    const targetHeight = contentWrapper.scrollHeight; 

                    const isDecreasing = currentHeight > targetHeight;

                    // Create timeline for animation
                    currentAnimation = gsap.timeline({
                        onComplete: () => {
                            if(isDecreasing) {
                                contentWrapper.style.height = 'auto';
                            } else {
                                contentWrapper.style.height = currentHeight + 'px';
                            }
                            isAnimating = false;
                            currentHeight = targetHeight;
                        }
                    });

                    // Always animate to new height
                    currentAnimation.fromTo(contentWrapper, 
                        { height: currentHeight },
                        { 
                            height: targetHeight,
                            duration: 0.3,
                            ease: "power2.out"
                        }
                    );
                    if(currentHeight !== targetHeight) {
                        currentHeight = targetHeight;
                    }
                    
                    
                });
            });

            const content = contentWrapper.querySelector('.content-wrapper');
            if (content) {
                resizeObserver.observe(content);
            }
        }
    });

    onDestroy(() => {
        if (resizeObserver) {
            resizeObserver.disconnect();
        }
        if (currentAnimation) {
            currentAnimation.kill();
        }
    });
</script>

<dialog {id} class="modal modal-middle">
    <div 
        class="modal-box bg-white rounded-[16px] p-[24px] {width} overflow-hidden scroll-hidden" 
        bind:this={contentWrapper}
    >
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="text-lg font-bold text-black">{title}</h3>
        <div class="w-full overflow-hidden">
            <div class="content-wrapper">
                <slot name="body" />
            </div>
        </div>
        <div class="modal-action">
            <slot name="footer" />
        </div>
    </div>
</dialog>

<style>
    .modal-box {
        will-change: height, transform;
        transform: translateZ(0);
        backface-visibility: hidden;
    }
</style>
