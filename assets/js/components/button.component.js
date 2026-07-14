/**
 * TopCare AI Button Component
 * Global UI Button System
 */


export function buttonComponent(data = {}) {


    const {

        text = "Button",

        link = "#",

        type = "primary",

        size = "medium",

        icon = ""

    } = data;



    return `

        <a

            href="${link}"

            class="
                tc-btn
                tc-btn-${type}
                tc-btn-${size}
            "

        >


            ${
                icon
                ?
                `<span class="tc-btn-icon">
                    ${icon}
                </span>`
                :
                ""
            }



            <span class="tc-btn-text">

                ${text}

            </span>


        </a>

    `;


}