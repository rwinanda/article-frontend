"use client";
import ContentPages from "@/components/admin-component/ContentPages";
import TitlePages from "@/components/admin-component/TitlePages";
import ProfileUserComponent from "@/components/ProfileUserComponent";

const AdminProfilePages = () => {
    return (
        <div>
            <TitlePages title="User Profile" />
            <ContentPages>
                <ProfileUserComponent textBtn="Back to dashboard" href="/admin"/>
            </ContentPages>
        </div>
    )
}

export default AdminProfilePages;