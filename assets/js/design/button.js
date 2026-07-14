export function Button({

    text = "",

    href = "#",

    type = "primary"

}){

    return `

        <a href="${href}"

            class="btn btn-${type}">

            ${text}

        </a>

    `;

}