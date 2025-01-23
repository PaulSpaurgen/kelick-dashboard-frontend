<script lang="ts">
    import { Chart, type ChartConfiguration    } from 'chart.js/auto';
    import { onMount } from "svelte";
    import { graphColors } from "$lib/utills/constants/CSS";

    export let values: number[] = [25, 40, 35];
    export let labels: string[] = ['Segment 1', 'Segment 2', 'Segment 3'];

    export let radius: number = 48;
    export let width: number = 100;
    export let height: number = 100;

    let chart: Chart;

    onMount(() => {
        const ctx = document.getElementById('myChart-semi') as HTMLCanvasElement;
        const config = {
            type: "doughnut", 
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: [
                        graphColors.green,  // Green
                        graphColors.purple,  // Blue
                        graphColors.yellow,  // Orange
                        graphColors.gray,   // Red
                    ],
                    borderWidth: 0,
                    radius: radius,
                    spacing: 4,     // Increased gap between segments from 2 to 8
                    borderRadius: 6, // Rounded corners
                    circumference: 180, // Full circle
                    rotation: -90   // Rotate to start from top
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '86%',  // Controls the thickness of the arcs
                plugins: {
                    legend: {
                        display: false  // Hide legend
                    },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function(context: any) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        };

        chart = new Chart(ctx, config as ChartConfiguration);

        return () => {
            chart.destroy();
        };

    });
</script>

<div class="relative w-fit h-fit">
    <canvas id="myChart-semi" width={width} height={height}></canvas>
</div>
