  /* When the user clicks on the button, 
    toggle between hiding and showing the dropdown content */
    function myFunction() {
        document.getElementById("myText").classList.toggle("show");
      }
      
      // Close the dropdown if the user clicks outside of it
      window.onclick = function(event) {
        if (!event.target.matches('.Why')) {
          var texs = document.getElementsByClassName("tex");
          var i;
          for (i = 0; i < texs.length; i++) {
            var openText = texs[i];
            if (openText.classList.contains('show')) {
              openText.classList.remove('show');
            }
          }
        }
      }