const career = () => {
  const readmoreClick = document.querySelectorAll(
    ".main-career__jobsearchbtn--readmore"
  );

  readmoreClick.forEach((item) => {
    item.addEventListener("click", (event) => {
      if (event.target.textContent === "ReadMore")
        event.target.textContent = "ReadLess";
      else {
        event.target.textContent = "ReadMore";
      }
      event.target
        .closest("div")
        .previousElementSibling.classList.toggle("close-careerinfo");
      // event.target
      //   .closest(".main-career__jobinfoDetail")
      //   .classList.toggle("close-careerinfo");
    });
  });
};
export default career;
