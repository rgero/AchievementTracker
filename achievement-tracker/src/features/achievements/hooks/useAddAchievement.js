import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addOrEditAchievement } from "../../../services/apiAchievements";
import toast from "react-hot-toast";

export const useAddAchievement = () => {
    const queryClient = useQueryClient();
    
    const {mutate: addAchievement, isLoading: isWorking} = useMutation({
        mutationFn: addOrEditAchievement,
        onSuccess: () => {
            toast.success("New Achievement created!");
            queryClient.invalidateQueries({queryKey: ['achievements']});
        },
        onError: (err) => {toast.error(err.message)}
    });

    return {isWorking, addAchievement};
}