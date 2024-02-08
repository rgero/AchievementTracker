import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addOrEditAchievement } from "../../../services/apiAchievements";
import toast from "react-hot-toast";

export const useEditAchievement = () => {
    const queryClient = useQueryClient();

    const {mutate: editAchievement, isLoading: isEditing} = useMutation({
        mutationFn: ({newAchievementData, id}) => {
          addOrEditAchievement(newAchievementData, id)
        },
        onSuccess: () => {
            toast.success("Achievement Updated!");
            queryClient.invalidateQueries({queryKey: ['achievements']});
        },
        onError: (err) => {toast.error(err.message)}
    });

    return {isEditing, editAchievement};
}