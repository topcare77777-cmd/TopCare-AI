import Widget from "../dashboard/widget.js";
import Layout from "../dashboard/layout.js";

class DashboardModule {
    mount() {
        Layout.setTitle("Dashboard");

        const stats = {
            members: 0,
            creators: 0,
            ebooks: 0,
            revenue: "Rp0"
        };

        const html = [
            Widget.card("Members", stats.members),
            Widget.card("Creators", stats.creators),
            Widget.card("Ebooks", stats.ebooks),
            Widget.card("Revenue", stats.revenue)
        ].join("");

        Layout.content(html);
    }
}

export default new DashboardModule();