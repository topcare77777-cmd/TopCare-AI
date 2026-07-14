import { Card } from "../design/card.js";

export function communityComponent(template,data){

    const posts = data.posts.map(post=>Card(`

        <h3>${post.title}</h3>

        <p>👤 ${post.author}</p>

        <small>

            ❤️ ${post.likes}

            &nbsp;&nbsp;

            💬 ${post.comments}

        </small>

    `)).join("");

    return template

        .replace("{{badge}}",data.badge)

        .replace("{{title}}",data.title)

        .replace("{{subtitle}}",data.subtitle)

        .replace("{{posts}}",posts);

}