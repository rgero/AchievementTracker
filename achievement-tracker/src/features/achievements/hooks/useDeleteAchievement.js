/* eslint-disable no-unused-vars */

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteAchievement as deleteAchievementAPI } from "../../../services/apiAchievements";
import toast from "react-hot-toast";

export const useDeleteAchievement = () => {
    const queryClient = useQueryClient();
    const {isLoading: isDeleting, mutate: deleteAchievement} = useMutation({
        mutationFn: (id) => deleteAchievementAPI(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["achievements"]})
            toast.success("Achievement Deleted");
        },
        onError: (err) => toast.error(err.message)
    })

    return {isDeleting, deleteAchievement}
}