const verifyEmailTemplate = url => {
  return `
    <table id='${Date.now()}' style="border-spacing: 0; border-collapse: collapse; font-family: proxima-nova, 'helvetica neue', helvetica, arial, geneva, sans-serif;
      width: 100% !important; height: 100% !important; color: #4c4c4c; font-size: 15px; line-height: 150%; background: #ffffff; margin: 0; padding: 0;
      border: 0;
    ">
      <tbody>
        <tr style="vertical-align: top; padding: 0">
          <td align="center" valign="top" style="vertical-align: top; padding: 0">
            <table style="border-spacing: 0; border-collapse: collapse; font-family: proxima-nova, 'helvetica neue', helvetica, arial, geneva, sans-serif;
              width: 600px; color: #4c4c4c; font-size: 15px; line-height: 150%; background: #ffffff; margin: 40px 0; padding: 0; border: 0;
            ">
              <tbody>
                <tr style="vertical-align: top; padding: 0">
                  <td align="center" valign="top" style="vertical-align: top; padding: 0 40px">
                    <table style=" border-spacing: 0; border-collapse: collapse;
                      font-family: proxima-nova, 'helvetica neue', helvetica, arial, geneva, sans-serif; width: 100%;
                      background: #ffffff; margin: 0; padding: 0;border: 0;
                    ">
                      <tbody>
                        <tr style="vertical-align: top; padding: 0">
                          <td style="vertical-align: top; text-align: left; padding: 0" align="left" valign="top">
                            <p style="margin: 20px 0">
                              Thanks for signing up with Styre! You must follow this link within 30 days of registration to
                              activate your account:
                            </p>
                            <p style="margin: 20px 0">
                              <a href="${url}" style="color: #6e5baa" target="_blank">
                                ${url}
                              </a>
                            </p>
                            <p style="margin: 20px 0">Have fun, and don't hesitate to contact us with your feedback.</p>
                            <p style="margin: 20px 0">
                              The Styre Team<br />
                            </p>
                            <p></p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  `;
};

module.exports = { verifyEmailTemplate };
