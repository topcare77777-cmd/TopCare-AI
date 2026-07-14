/**
 * TopCare AI Universal Renderer
 * v2.0.0 Alpha
 */


export async function render({

    selector,
    template,
    data,
    component

}) {


    const target = document.querySelector(selector);


    if (!target) {

        console.warn(
            `Renderer: selector ${selector} tidak ditemukan`
        );

        return;

    }



    try {


        const templateResponse = await fetch(
            `templates/components/${template}.html`
        );


        if (!templateResponse.ok) {

            throw new Error(
                `Template ${template}.html tidak ditemukan`
            );

        }


        const templateHTML =
            await templateResponse.text();



        let jsonData = {};



        if (data) {


            const dataResponse = await fetch(
                `assets/json/${data}.json`
            );


            if (dataResponse.ok) {


                const rawData =
                    await dataResponse.text();



                if (rawData.trim() !== "") {

                    jsonData =
                        JSON.parse(rawData);

                }


            }


        }



        if (typeof component !== "function") {


            throw new Error(
                "Component renderer tidak ditemukan"
            );


        }



        target.innerHTML =
            component(
                jsonData,
                templateHTML
            );



        console.log(
            `Rendered: ${template}`
        );



    } catch(error) {


        console.error(
            "Renderer Error:",
            error
        );


        target.innerHTML = `

            <div class="renderer-error">

                <strong>
                    TopCare AI Renderer Error
                </strong>

                <p>
                    ${error.message}
                </p>

            </div>

        `;


    }


}