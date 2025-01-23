<script lang="ts">
    import { Chart, type ChartConfiguration } from 'chart.js/auto';
    import { onMount } from "svelte";
    import { graphColors } from "$lib/utills/constants/CSS";

    export let values: number[] = [25, 25, 25, 25];
    export let labels: string[] = ['Segment 1', 'Segment 2', 'Segment 3', 'Segment 4'];


    let chart: Chart;

    onMount(() => {
        const ctx = document.getElementById("myChart-circle") as HTMLCanvasElement;
        
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
                    radius: 48,
                    spacing: 4,     // Increased gap between segments from 2 to 8
                    borderRadius: 6, // Rounded corners
                    circumference: 360, // Full circle
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

    // Update chart when values change
    $: if (chart) {
        chart.data.datasets[0].data = values;
        chart.update();
    }
</script>

<div class="relative w-fit h-fit">
    <canvas id="myChart-circle" class="w-[100px] h-[100px]"></canvas>
</div>
