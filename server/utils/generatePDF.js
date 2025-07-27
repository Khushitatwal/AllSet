const PDFDocument = require("pdfkit");
const getStream = require("get-stream");

async function generateSchedulePDF(schedule) {
  const doc = new PDFDocument();
  doc
    .fontSize(16)
    .text("Smart Study Scheduler", { align: "center", underline: true });
  doc.moveDown();

  Object.keys(schedule).forEach((date, dateIndex) => {
    const tasks = schedule[date];
    if (!tasks.length) return;

    doc.fontSize(14).text(`Date: ${date}`, { underline: true }).moveDown(0.5);

    const grouped = {};
    tasks.forEach((task) => {
      if (!grouped[task.planTitle]) grouped[task.planTitle] = [];
      grouped[task.planTitle].push(task);
    });

    Object.keys(grouped).forEach((planTitle) => {
      doc.fontSize(13).fillColor("black").text(`${planTitle} :`);
      grouped[planTitle].forEach((task, idx) => {
        doc
          .fontSize(12)
          .fillColor("black")
          .text(
            `${idx + 1}. ${task.title} (Part: ${
              task.scheduledPart
            }, Estimated: ${task.estimatedTime} hr)`
          );
      });
      doc.moveDown(0.5);
    });
  });

  doc.end();
  return await getStream.buffer(doc); // returns a buffer
}

module.exports = generateSchedulePDF;
