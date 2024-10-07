export const handleFormatResponse = (
  textToBeFormatted,
  // setFormattedText,
  Typography,
  Box,
  styled
) => {
  const enclosedPatternRegex = /```(.*?)```/gs;
  // const parts = streamedResponse?.join("")?.split(enclosedPatternRegex);
  const parts = textToBeFormatted?.split(enclosedPatternRegex);
  // console.log('textToBeFormattedCode', parts);
  const formattedParts = parts?.map((part, index) => {
    if (index % 2 === 0) {
      // console.log("textToBeFormatted", textToBeFormatted?.split(parts));
      const paragraphs = part?.split('\n\n');
      // console.log("streamedResponse", paragraphs);
      const formattedParagraphs = paragraphs?.map((paragraph, index) => {
        // if (index % 2 === 0) {
        // Split each paragraph into lines
        const lines = paragraph.split('\n');
        const formattedLines = lines.map((line, lineIndex) => {
          if (line?.startsWith('##')) {
            // Handle lines starting with double asterisks as headings
            return (
              <Typography key={lineIndex} variant="h3">
                {line?.replace(/##/g, '')}
              </Typography>
            );
          } else if (line?.startsWith('* ')) {
            if (line?.startsWith('**')) {
              // Handle lines starting with asterisks as list items
              return (
                <Box sx={{ padding: '0rem 0 0 2rem' }} key={lineIndex}>
                  <Typography variant="h5">
                    {line?.substring(2)?.replace(/\*\*/g, ``)}
                    {lineIndex}
                  </Typography>
                </Box>
              );
            } else {
              return (
                <Typography key={lineIndex} variant="h6">
                  <Box
                    sx={{
                      padding: '0rem 0 0 2rem',
                    }}
                  >
                    {line?.substring(2)?.replace(/\*\*/g, ``)}
                  </Box>
                </Typography>
              ); // Remove the "* "
            }
          } else if (line?.startsWith('**')) {
            // Handle lines starting with double asterisks as headings
            return (
              <Box sx={{ padding: '0rem 0 0 1rem' }} key={lineIndex}>
                <Typography variant="body1">
                  {line?.replace(/\*\*/g, '')}
                </Typography>
              </Box>
            ); // Remove the "**"
          } else {
            // Other lines are regular text
            return (
              <Box sx={{ padding: '0rem 0rem 0.5rem 0.5rem' }} key={lineIndex}>
                <Typography
                  variant="body1"
                  sx={
                    line.length > 300
                      ? { ...styled?.truncate, fontSize: '0.4rem' }
                      : { ...styled?.textBody, fontSize: '0.8rem' }
                  }
                >
                  {line}
                </Typography>
              </Box>
            );
          }
        });
        // Wrap list items in a <ul> if needed
        if (formattedLines.some((line) => line?.type === 'li')) {
          return (
            <ul key={index}>
              <Typography
                sx={{ ...styled?.textBody, fontSize: '0.8rem' }}
                key={formattedLines}
                variant="body1"
              >
                {formattedLines}
              </Typography>
            </ul>
          );
        } else {
          return formattedLines;
          // Otherwise, just return the formatted lines
        }
      });
      return formattedParagraphs;
    } else {
      const language = part.split('\n')[0];
      const code = part.replace(`json `, '');
      // console.log("textToBeFormattedCode", code);
      // const code = JSON.stringify(part.split("json ")[1]);
      // return (
      //   <CodeBlock
      //     key={lineIndex}
      //     content={code}
      //     language="json"
      //     styled={styled}
      //   />
      // );
      // if (language === "json") {
      //   // Handle JSON code blocks
      //   return <CodeBlock content={code} language="json" />;
      // }
    }
    // return null;
  });
  return formattedParts;
  // setFormattedText(formattedParts);
};
export const splitWithIndex = (str, setCode) => {
  const regex = /```([\s\S]*?)```/;
  let segments = str.split(regex);
  let result = [];

  for (let i = 0; i < segments.length; i++) {
    const matches = str?.match(regex);

    if (matches) {
      const tempCode = matches[1];
      setCode(tempCode);

      result.push({
        index: i,
        type: matches[1] === segments[i] && 'code',
        segment: segments[i],
      });
    } else {
      result.push({ index: i, type: 'comment', segment: segments[i] });
    }
  }

  return result;
};
