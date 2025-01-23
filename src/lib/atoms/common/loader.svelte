

<div class="w-full h-[80vh] flex items-center justify-center">
  <div class="loader" ></div>

  <style>
    .loader {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: inline-block;
      border-top: 4px solid #02B9B0;
      border-right: 4px solid transparent;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  </style>
</div>

